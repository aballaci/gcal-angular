import * as moment from 'moment';
import {of} from 'rxjs';
import {takeWhile} from 'rxjs/operators';

export class Utils {

  /**
   * Return 12-hour format to 24-hour.
   *
   * @param  {Number} hours
   * @return {String}
   */
  static getMilitaryHours(hours) {
    if (hours % 1 === 0.5) {
      return `${Math.floor(hours)}30`;
    }
    return `${Math.round(hours)}00`;
  }

  /**
   * Gets the duration between dates.
   *
   * @param  {String} startDate
   * @param  {String} endDate
   * @param  {Number} timezone
   * @return {String}
   */
  static getHoursDuration(startDate, endDate, timezone) {
    const start = moment(startDate);
    const end = moment(endDate);

    if (timezone) {
      start.utcOffset(timezone);
      end.utcOffset(timezone);
    }

    const hours = moment
      .duration(end.diff(start))
      .asHours();

    return this.getMilitaryHours(hours);
  }

  /**
   * Removes line breaks and ensures that the string is no
   * longer than maxLength chars (or 75 chars if none specified).
   *
   * @param  {String} s         string to sanitize
   * @param  {Number} maxLength index of string to truncate at
   * @return {String}
   */
  static formatIcsText(str, maxLength) {
    if (!str) {
      return '';
    }
    str = str.replace(/\n/g, '\\n');
    str = str.substring(0, maxLength);
    return str;
  }

  /**
   * Format time as a universal timestamp format w.r.t. the given timezone.
   *
   * @param  {String} timestamp valid RFC-2822 string timestamp
   * @param  {String} timezone  tz offset (in minutes) (optional)
   * @return {String}
   */
  static toUniversalTime(timestamp, timezone) {
    const dt = moment(timestamp);

    if (timezone) {
      dt.utcOffset(timezone);
    }
    return dt.format('YYYYMMDDTHHmmss');
  }

  /**
   * The name of the file will be the event title with alphanumeric chars
   * having the extension `.ics`.
   *
   * @param  {String} icsData
   * @return {Blob}
   */
  static getIcsBlob(icsData) {
    return new Blob([icsData], {
      type: 'application/octet-stream'
    });
  }

  /**
   * Transforms given string to be valid file name.
   *
   * @param  {String} title
   * @return {String}
   */
  static getIcsFileName(title) {
    if (!title) {
      return 'event.ics';
    }
    return `${title.replace(/[^\w ]+/g, '')}.ics`;
  }

  /**
   * Returns a random base 36 hash for iCal UID.
   *
   * @return {String}
   */
  static getUid() {
    return Math.random().toString(36).substr(2);
  }

  /**
   * Returns a universal timestamp of current time.
   *
   * @return {String}
   */
  static getTimeCreated() {
    return moment().format('YYYYMMDDTHHmmss');
  }

  static foldLongString(str: string): string {
    const pieces = str.split(' ');
    const lines = new Array<string>();
    let line = '';
    pieces.forEach(x => {
      if (line.length + x.length < 62) {
        line = line.concat(x).concat(' ');
      } else {
        lines.push(line);
        line = x;
      }
    });
    return lines.join('\r\n');
  }
}
