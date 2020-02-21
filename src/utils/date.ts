interface Date {
  addHours(hours: number): Date;
  addMinutes(minutes: number): Date;
  addDays(days: number): Date;
  addMonths(months: number): Date;
  addYears(years: number): Date;
}

Date.prototype.addHours = function(hours: number) {
  this.setTime(this.getTime() + hours * 60 * 60 * 1000);
  return this;
};

Date.prototype.addMinutes = function(minutes: number) {
  this.setTime(this.getTime() + minutes * 60 * 1000);
  return this;
};

Date.prototype.addDays = function(days: number) {
  this.setTime(this.getTime() + days * 24 * 60 * 60 * 1000);
  return this;
};

Date.prototype.addMonths = function(months: number) {
  this.setTime(this.getTime().setMonth(this.getTime().getMonth() + months));
  return this;
};

Date.prototype.addYears = function(years: number) {
  this.setFullYear(this.getTime().getFullYear() + years);
  return this;
};
