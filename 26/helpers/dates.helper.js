import Moment from 'moment';
import {extendMoment} from 'moment-range';
import intersection from 'lodash/intersection';
import twix from 'twix';

const moment = extendMoment(Moment);

export const calcJointTime = ([userSource, userCompare]) => {

  // Calculate of common working hours
  const momentsRangeSource = _getMomentsRangeFromUserWorkPeriod(
    userSource.workPeriod.from,
    userSource.workPeriod.to,
    userSource.timezone
  );

  const momentsRangeCompare = _getMomentsRangeFromUserWorkPeriod(
    userCompare.workPeriod.from,
    userCompare.workPeriod.to,
    userCompare.timezone
  );

  const rangeSource = momentsRangeSource.start.twix(momentsRangeSource.end);
  const rangeCompare = momentsRangeCompare.start.tz(userSource.timezone).twix(momentsRangeCompare.end.tz(userSource.timezone));

  const commonHours = rangeSource.intersection(rangeCompare);

  // Calculate of common working days
  const daysSource = _getDaysArray(userSource.workPeriod.weekDays);
  const daysCompare = _getDaysArray(userCompare.workPeriod.weekDays);

  const intersectionWorkDays = intersection(daysSource, daysCompare);

  return {
    hours: commonHours.simpleFormat('HH:mm'),
    days: intersectionWorkDays
  };
};

export const isDateInRange = ({from, to, weekDays}, timezone) => {
  const daysList = _getDaysArray(weekDays);

  return _isDayInDaysList(daysList, timezone) && _isTimeInRange(from, to, timezone);
};

const _getDaysArray = (days) => days.trim().split(' ');

const _isTimeInRange = (from, to, timezone) => {
  const {start, end} = _getMomentsRangeFromUserWorkPeriod(from, to, timezone);
  const currentTzTime = moment().tz(timezone);

  return currentTzTime.isBetween(start, end);
};

const _isDayInDaysList = (weekDaysArray, timezone) => {
  const momentTz = moment().tz(timezone);
  const day = momentTz.format('dd');

  return weekDaysArray.includes(day);
};

const _getMomentsRangeFromUserWorkPeriod = (from, to, timezone) => {
  return {
    start: moment.tz(from, 'HH:mm', timezone),
    end: moment.tz(to, 'HH:mm', timezone)
  };
};
