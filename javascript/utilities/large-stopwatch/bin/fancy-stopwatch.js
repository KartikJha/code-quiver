
const Stopwatch = require('../lib/stopwatch');

const resumeTime = process.argv[2] || '0';
const stopwatch = new Stopwatch({ fancy: true });
stopwatch.start(resumeTime);

// lib/stopwatch.js
const figlet = require('figlet');
const chalk = require('chalk');

class Stopwatch {
  constructor(options = {}) {
    this.fancy = options.fancy || false;
    this.compact = options.compact || false;
    this.silent = options.silent || false;
    this.startTime = null;
    this.previousMs = 0;
    this.interval = null;
  }

  parseTime(timeStr) {
    if (timeStr === '0' || !timeStr) return 0;

    // HH:MM:SS.mmm or HH:MM:SS
    if (/^\d+:\d+:\d+(\.\d+)?$/.test(timeStr)) {
      const [hours, minutes, seconds] = timeStr.split(':');
      return (parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseFloat(seconds)) * 1000;
    }
    
    // MM:SS.mmm or MM:SS
    if (/^\d+:\d+(\.\d+)?$/.test(timeStr)) {
      const [minutes, seconds] = timeStr.split(':');
      return (parseInt(minutes) * 60 + parseFloat(seconds)) * 1000;
    }
    
    // seconds.milliseconds
    if (/^\d+(\.\d+)?$/.test(timeStr)) {
      return parseFloat(timeStr) * 1000;
    }

    throw new Error('Invalid time format. Use: seconds.ms, MM:SS.ms, or HH:MM:SS.ms');
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

  clearScreen() {
    process.stdout.write('\x1B[2J\x1B[0f');
  }

  displayHeader() {
    if (this.fancy) {
      console.log(chalk.rainbow('╔══════════════════════════════════════════╗'));
      console.log(chalk.rainbow('║              STOPWATCH                   ║'));
      console.log(chalk.rainbow('╚══════════════════════════════════════════╝'));
    } else {
      console.log(chalk.green('┌─────────────────────────────────────────┐'));
      console.log(chalk.green('│              STOPWATCH                  │'));
      console.log(chalk.green('└─────────────────────────────────────────┘'));
    }
    console.log();
  }

  displayTime(timeStr) {
    if (this.compact) {
      // Simple large text without figlet
      console.log();
      console.log('    ███████████████████████████████████');
      console.log('    █                                 █');
      console.log(`    █         ${timeStr.padStart(15)}      █`);
      console.log('    █                                 █');
      console.log('    ███████████████████████████████████');
      console.log();
    } else {
      try {
        const figletText = figlet.textSync(timeStr, { 
          font: 'Big',
          horizontalLayout: 'default',
          verticalLayout: 'default'
        });
        
        if (this.fancy) {
          console.log(chalk.rainbow(figletText));
        } else {
          console.log(chalk.cyan(figletText));
        }
      } catch (err) {
        // Fallback if figlet fails
        console.log();
        console.log(`         ${timeStr}`);
        console.log();
      }
    }
  }

  displayFooter() {
    console.log();
    if (this.fancy) {
      console.log(chalk.rainbow('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
      console.log(chalk.rainbow('              Press Ctrl+C to stop              '));
      console.log(chalk.rainbow('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
    } else {
      console.log(chalk.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
      console.log(chalk.cyan('              Press Ctrl+C to stop              '));
      console.log(chalk.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
    }
  }

  displayStop(finalTime) {
    this.clearScreen();
    console.log();
    
    try {
      const stopText = figlet.textSync('STOPPED', { 
        font: 'Big',
        horizontalLayout: 'default'
      });
      console.log(chalk.red(stopText));
    } catch (err) {
      console.log(chalk.red('STOPPED'));
    }
    
    console.log();
    console.log(chalk.yellow(`Final time: ${this.formatTime(finalTime)}`));
    console.log();
  }

  start(resumeTimeStr = '0') {
    try {
      this.previousMs = this.parseTime(resumeTimeStr);
    } catch (err) {
      console.error(chalk.red(err.message));
      process.exit(1);
    }

    this.startTime = Date.now() - this.previousMs;

    // Setup clean exit
    process.on('SIGINT', () => {
      if (this.interval) {
        clearInterval(this.interval);
      }
      const finalTime = Date.now() - this.startTime;
      this.displayStop(finalTime);
      process.exit(0);
    });

    // Initial message
    if (!this.silent) {
      this.clearScreen();
      if (this.previousMs === 0) {
        console.log(chalk.green('\nStopwatch Started'));
      } else {
        console.log(chalk.yellow(`\nStopwatch Resumed from ${this.formatTime(this.previousMs)}`));
      }
      console.log(chalk.cyan('Press Ctrl+C to stop\n'));
      
      setTimeout(() => {
        this.runStopwatch();
      }, 2000);
    } else {
      this.runStopwatch();
    }
  }

  runStopwatch() {
    this.interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = currentTime - this.startTime;
      const timeStr = this.formatTime(elapsed);

      this.clearScreen();
      this.displayHeader();
      this.displayTime(timeStr);
      this.displayFooter();
    }, 1000);
  }
}

module.exports = Stopwatch;

