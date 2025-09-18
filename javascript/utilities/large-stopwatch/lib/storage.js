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

  getDataFilePath(date = null) {
    const dateStr = date || new Date().toISOString().split('T')[0]; // YYYY-MM-DD
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

  addSession(label, sessionTime, date = null) {
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
