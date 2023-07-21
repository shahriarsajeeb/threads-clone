import moment from 'moment';

const getTimeDuration = (time: Date): string => {
  const createdAt = moment(time);
  const now = moment();
  const duration = moment.duration(now.diff(createdAt));

  if (duration.asSeconds() < 60) {
    return `${Math.floor(duration.asSeconds())}s`;
  } else if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())}m`;
  } else if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())}h`;
  } else if (duration.asDays() < 30) {
    return `${Math.floor(duration.asDays())}d`;
  } else if (duration.asMonths() < 12) {
    return `${Math.floor(duration.asMonths())}mo`;
  } else {
    return `${Math.floor(duration.asYears())}y`;
  }
};

export default getTimeDuration;
