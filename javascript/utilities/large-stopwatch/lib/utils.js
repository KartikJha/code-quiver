const { execSync } = require('child_process');
const chalk = require('chalk');

class Utils {
  static checkSystemDependencies() {
    const dependencies = ['figlet'];
    const missing = [];

    dependencies.forEach(dep => {
      try {
        execSync(`which ${dep}`, { stdio: 'ignore' });
      } catch (err) {
        missing.push(dep);
      }
    });

    return missing;
  }

  static installSystemDependencies() {
    console.log(chalk.yellow('Checking system dependencies...'));
    
    const missing = this.checkSystemDependencies();
    
    if (missing.length === 0) {
      console.log(chalk.green('All system dependencies are installed!'));
      return;
    }

    console.log(chalk.yellow(`Missing dependencies: ${missing.join(', ')}`));
    console.log(chalk.cyan('On Ubuntu/Debian: sudo apt install figlet'));
    console.log(chalk.cyan('On macOS: brew install figlet'));
    console.log(chalk.cyan('On CentOS/RHEL: sudo yum install figlet'));
  }

  static formatHelp() {
    return `
${chalk.bold('Large Display Terminal Stopwatch')}

${chalk.yellow('Usage:')}
  stopwatch [time]              Start or resume stopwatch
  lsw [time]                    Alias for stopwatch
  fancy-stopwatch [time]        Colorful version
  fsw [time]                    Alias for fancy-stopwatch

${chalk.yellow('Time Formats:')}
  30.5                          30.5 seconds
  2:30.5                        2 minutes 30.5 seconds  
  1:15:30.5                     1 hour 15 minutes 30.5 seconds

${chalk.yellow('Options:')}
  -f, --fancy                   Use colorful display
  -c, --compact                 Use compact display (no figlet required)
  -s, --silent                  Start without initial messages
  -h, --help                    Show help
  -V, --version                 Show version

${chalk.yellow('Examples:')}
  stopwatch                     Start new stopwatch
  stopwatch 45.500              Resume from 45.5 seconds
  stopwatch 2:30                Resume from 2 minutes 30 seconds
  lsw --fancy 1:15:30           Resume fancy stopwatch from 1h 15m 30s
  stopwatch --compact           Use simple display without figlet
`;
  }
}

module.exports = Utils;


