const SECONDS = {
  // The short suffix used when generating humanized time stamps.
  suffix: 's',

  // The duration in seconds of this unit.
  duration: 1,
};

const MINUTES = {
  suffix: 'm',
  duration: 60 * SECONDS.duration,
};

const HOURS = {
  suffix: 'h',
  duration: 60 * MINUTES.duration,
};

const UNITS = [HOURS, MINUTES, SECONDS];

export const formatDuration = num => {
  const totalSeconds = Math.round(num);

  const { output } = UNITS.reduce(
    ({ remainingDuration, output }, { duration: unitDuration }, index) => {
      if (remainingDuration >= unitDuration || output.length || index > 0) {
        const totalUnits = Math.floor(remainingDuration / unitDuration);
        remainingDuration -= totalUnits * unitDuration;

        const rawTotalUnits = String(totalUnits).padStart(2, '0');
        output.push(rawTotalUnits);
      }

      return { remainingDuration, output };
    },
    {
      remainingDuration: totalSeconds,
      output: [],
    }
  );

  return output.join(':');
};
