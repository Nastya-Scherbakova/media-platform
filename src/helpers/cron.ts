export class Cron {
  readonly anyChar = '*';

  readonly minute: string;
  readonly hour: string;
  readonly day: string;
  readonly month: string;
  readonly dayOfTheWeek: string;
  readonly year: string;

  constructor(cron: string) {
    let cronParts = cron.split(' ');
    if (cronParts.length < 5) {
      throw new Error('Cron expression length should be >= 5');
    }

    this.minute = cronParts[0];
    this.hour = cronParts[1];
    this.day = cronParts[2];
    this.month = cronParts[3];
    this.dayOfTheWeek = cronParts[4];
    this.year = cronParts.length === 6 ? cronParts[5] : this.anyChar;
  }

  readonly valueActions = [
    {
      field: this.minute,
      getFunction: Date.prototype.getUTCMinutes,
      addFunction: Date.prototype.addHours,
      assignFunction: Date.prototype.setUTCMinutes,
      valueAdd: 1,
    },
    {
      field: this.hour,
      getFunction: Date.prototype.getUTCHours,
      addFunction: Date.prototype.addDays,
      assignFunction: Date.prototype.setUTCHours,
      valueAdd: 1,
    },
    {
      field: this.month,
      getFunction: Date.prototype.getUTCMonth,
      addFunction: Date.prototype.addYears,
      assignFunction: Date.prototype.setUTCMonth,
      valueAdd: 1,
    },
    {
      field: this.year,
      getFunction: Date.prototype.getUTCFullYear,
      assignFunction: Date.prototype.setUTCFullYear,
    },
  ];

  private getDateByValueActions(date: Date): Date {
    this.valueActions.forEach(el => {
      el.getFunction.bind(date);
      if (
        el.field !== this.anyChar &&
        parseInt(el.field) !== el.getFunction()
      ) {
        const fieldValue = parseInt(el.field);
        if (el.getFunction() > fieldValue && el.addFunction) {
          el.addFunction.bind(date);
          el.addFunction(el.valueAdd);
        }
        el.assignFunction.bind(date);
        el.assignFunction(fieldValue);
      }
    });
    return date;
  }

  public checkDate(date: Date): boolean {
    this.valueActions.forEach(el => {
      el.getFunction.bind(date);
      if (
        el.field !== this.anyChar &&
        parseInt(el.field) !== el.getFunction()
      ) {
        return false;
      }
    });
    if (!this.isDayInCron(date)) {
      return false;
    }
    return true;
  }

  public getNextDate(maxCyclesCount?: number): Date {
    const maxCycles = maxCyclesCount || 50;

    let dateNow = new Date().addMinutes(1);
    dateNow.setUTCSeconds(0);
    dateNow.setUTCMilliseconds(0);

    //to limit count of cycles
    let i = 0;
    for (; i < maxCycles && !this.checkDate(dateNow); i++) {
      dateNow = this.getDateByValueActions(dateNow);
      dateNow = this.setDayInDate(dateNow);
    }
    if (i === maxCycles) {
      throw new Error('Cron seems to be invalid, cannot find appropriate date');
    }

    return dateNow;
  }

  private setDayInDate(dateNow: Date): Date {
    if (this.day !== this.anyChar) {
      dateNow.setUTCDate(parseInt(this.day));
      if (parseInt(this.day) < dateNow.getUTCDate()) {
        dateNow = dateNow.addMonths(1);
      }
      while (
        this.dayOfTheWeek !== this.anyChar &&
        dateNow.getUTCDay() !== parseInt(this.dayOfTheWeek)
      ) {
        dateNow = dateNow.addMonths(1);
      }
    } else if (this.dayOfTheWeek !== this.anyChar) {
      while (dateNow.getUTCDay() !== parseInt(this.dayOfTheWeek)) {
        dateNow = dateNow.addDays(1);
      }
    }
    return dateNow;
  }

  public isDayInCron(date: Date): boolean {
    if (!this.isDayOfTheWeekInCron(date) || !this.isMonthInCron(date)) {
      return false;
    }
    if (this.anyChar === this.day) {
      return true;
    }
    return this.day === date.getUTCDate().toString();
  }

  private isDayOfTheWeekInCron(date: Date): boolean {
    if (this.anyChar === this.dayOfTheWeek) {
      return true;
    }
    return this.dayOfTheWeek === date.getUTCDay().toString();
  }

  private isMonthInCron(date: Date): boolean {
    if (this.anyChar === this.month) {
      return true;
    }
    return this.month === date.getUTCMonth().toString();
  }
}
