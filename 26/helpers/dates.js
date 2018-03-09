import Moment from 'moment';
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

export const dateInRange = ({from, to, weekDays}, timezone) => {
  const daysList = weekDays.trim().split(' ');

  return _dayInDaysList(daysList, timezone) && _timeInRange(from, to, timezone);
};


export const calcJointTime = (workPeriods) => {
  //TODO
    return 100;
};

const _timeInRange = (from, to, timezone) => {
  const startDate = moment(from, 'HH:mm').tz(timezone);
  const endDate = moment(to, 'HH:mm').tz(timezone);
  const currentTzTime = moment().tz(timezone);

  return currentTzTime.isBetween(startDate, endDate);
};
const _dayInDaysList = (weekDaysArray, timezone) => {
  const momentTz = moment().tz(timezone);
  const currentDayWithTz = momentTz.format('dd');

  return weekDaysArray.includes(currentDayWithTz);
};
