const fs = require('fs');
const path = require('path');
const os = require('os');

class StopwatchStorage {
  constructor() {
    this.dataDir = path.join(os.homedir(), '.stopwatch-data');
    this.ensureDataDir();
  }

  ensureDataDir() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  /*
  getDataFilePath(date = null) {
    const dateStr = date || new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return path.join(this.dataDir, `${dateStr}.json`);
  }
*/
  getDataFilePath(date = null) {
  // If date is provided, use it; else use now
  const d = date ? new Date(date) : new Date();

  // Format to YYYY-MM-DD in system timezone
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // months start at 0
  const day = String(d.getDate()).padStart(2, '0');

  const dateStr = `${year}-${month}-${day}`;

  return path.join(this.dataDir, `${dateStr}.json`);
}

  loadDayData(date = null) {
    const filePath = this.getDataFilePath(date);
    
    if (!fs.existsSync(filePath)) {
      return {};
    }

    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error loading data for ${date || 'today'}:`, error.message);
      return {};
    }
  }

  saveDayData(dayData, date = null) {
    const filePath = this.getDataFilePath(date);
    
    try {
      fs.writeFileSync(filePath, JSON.stringify(dayData, null, 2));
    } catch (error) {
      console.error(`Error saving data for ${date || 'today'}:`, error.message);
    }
  }

  getLabelData(label, date = null) {
    const dayData = this.loadDayData(date);
    return dayData[label] || {
      totalTime: 0,
      sessions: [],
      lastUpdated: new Date().toISOString()
    };
  }

  saveLabelData(label, labelData, date = null) {
    const dayData = this.loadDayData(date);
    dayData[label] = {
      ...labelData,
      lastUpdated: new Date().toISOString()
    };
    this.saveDayData(dayData, date);
  }

  // Helper function to get the end of day timestamp for a given date
  getEndOfDay(date) {
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay.getTime();
  }

  // Helper function to get the start of day timestamp for a given date
  getStartOfDay(date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    return startOfDay.getTime();
  }

  // Helper function to format date as YYYY-MM-DD string
  formatDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Helper function to add one day to a date
  addOneDay(date) {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  }

  addSession(label, sessionTime, date = null, startTime) {
    if (!startTime) {
      // Fallback to original behavior if no startTime provided
      const labelData = this.getLabelData(label, date);
      const diff = sessionTime - labelData.totalTime;
      const sessionData = {
        startTime: new Date().toISOString(),
        duration: sessionTime,
        timestamp: Date.now()
      };
      
      labelData.totalTime += diff;
      labelData.sessions.push(sessionData);
      
      this.saveLabelData(label, labelData, date);
      
      return {
        lapTime: diff,
        totalTime: labelData.totalTime
      };
    }

    const startTimestamp = new Date(startTime).getTime();
    const endTimestamp = Date.now();
    const totalDuration = endTimestamp - startTimestamp;

    let currentDate = new Date(startTime);
    let remainingTime = totalDuration;
    let processedTime = 0;
    
    const sessions = [];

    while (remainingTime > 0) {
      const currentDateString = this.formatDateString(currentDate);
      const endOfCurrentDay = this.getEndOfDay(currentDate);
      const startOfCurrentDay = this.getStartOfDay(currentDate);
      
      // Calculate the start time for this day's session
      const daySessionStart = Math.max(startTimestamp + processedTime, startOfCurrentDay);
      
      // Calculate how much time to allocate to this day
      let timeForThisDay;
      if (daySessionStart + remainingTime <= endOfCurrentDay) {
        // Remaining time fits entirely in this day
        timeForThisDay = remainingTime;
      } else {
        // Time extends beyond this day
        timeForThisDay = endOfCurrentDay - daySessionStart + 1; // +1 to include the last millisecond of the day
      }

      if (timeForThisDay > 0) {
        // Get existing label data for this day
        const labelData = this.getLabelData(label, currentDateString);
        
        // Create session data for this day
        const sessionData = {
          startTime: new Date(daySessionStart).toISOString(),
          duration: timeForThisDay,
          timestamp: daySessionStart,
          isMultiDay: totalDuration > timeForThisDay, // Flag to indicate this is part of a multi-day session
          multiDayInfo: {
            totalSessionDuration: totalDuration,
            sessionStartTime: new Date(startTimestamp).toISOString(),
            sessionEndTime: new Date(endTimestamp).toISOString(),
            dayPortion: `${new Date(daySessionStart).toISOString()} to ${new Date(Math.min(daySessionStart + timeForThisDay - 1, endOfCurrentDay)).toISOString()}`
          }
        };
        
        // Add to this day's data
        labelData.totalTime += timeForThisDay;
        labelData.sessions.push(sessionData);
        
        // Save the updated data for this day
        this.saveLabelData(label, labelData, currentDateString);
        
        sessions.push({
          date: currentDateString,
          duration: timeForThisDay,
          lapTime: timeForThisDay
        });
      }

      // Update counters for next iteration
      remainingTime -= timeForThisDay;
      processedTime += timeForThisDay;
      currentDate = this.addOneDay(currentDate);
    }

    // Calculate total time across all days for return value
    const totalTimeAcrossAllDays = sessions.reduce((sum, session) => sum + session.duration, 0);
    
    return {
      lapTime: totalTimeAcrossAllDays,
      totalTime: totalTimeAcrossAllDays,
      multiDaySession: sessions.length > 1,
      dayBreakdown: sessions
    };
  }

  getAllLabels() {
    const labels = new Map(); // label -> { dates: [dates], totalAcrossAllDays: number }
    
    if (!fs.existsSync(this.dataDir)) {
      return labels;
    }

    try {
      const files = fs.readdirSync(this.dataDir).filter(file => file.endsWith('.json'));
      
      files.forEach(file => {
        const date = file.replace('.json', '');
        const dayData = this.loadDayData(date);
        
        Object.keys(dayData).forEach(label => {
          if (!labels.has(label)) {
            labels.set(label, {
              dates: [],
              totalAcrossAllDays: 0,
              sessions: 0
            });
          }
          
          const labelInfo = labels.get(label);
          labelInfo.dates.push(date);
          labelInfo.totalAcrossAllDays += dayData[label].totalTime;
          labelInfo.sessions += dayData[label].sessions.length;
        });
      });
      
    } catch (error) {
      console.error('Error reading labels:', error.message);
    }
    
    return labels;
  }

  formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const ms = milliseconds % 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  }

  displayLabels() {
    const labels = this.getAllLabels();
    
    if (labels.size === 0) {
      console.log('\nNo labels found.\n');
      return;
    }

    console.log('\n📊 Stopwatch Labels Summary:\n');
    console.log('─'.repeat(80));
    console.log('Label'.padEnd(20) + 'Days'.padEnd(8) + 'Sessions'.padEnd(12) + 'Total Time'.padEnd(20) + 'Recent Dates');
    console.log('─'.repeat(80));
    
    // Sort labels by total time (descending)
    const sortedLabels = Array.from(labels.entries()).sort((a, b) => b[1].totalAcrossAllDays - a[1].totalAcrossAllDays);
    
    sortedLabels.forEach(([label, info]) => {
      const recentDates = info.dates
        .sort((a, b) => new Date(b) - new Date(a))
        .slice(0, 3)
        .join(', ');
      
      console.log(
        label.padEnd(20) + 
        info.dates.length.toString().padEnd(8) + 
        info.sessions.toString().padEnd(12) + 
        this.formatTime(info.totalAcrossAllDays).padEnd(20) + 
        recentDates
      );
    });
    
    console.log('─'.repeat(80));
    console.log(`\nTotal: ${labels.size} labels across ${new Set(Array.from(labels.values()).flatMap(l => l.dates)).size} days\n`);
  }
}

module.exports = StopwatchStorage;