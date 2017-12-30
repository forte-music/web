// @flow

type DurationSpec = {
  // The short suffix used when generating humanized time stamps.
  suffix: string,

  // The duration in seconds of this unit.
  duration: number,
};

const SECONDS: DurationSpec = {
  suffix: 's',
  duration: 1,
};

const MINUTES: DurationSpec = {
  suffix: 'm',
  duration: 60 * SECONDS.duration,
};

const HOURS: DurationSpec = {
  suffix: 'h',
  duration: 60 * MINUTES.duration,
};

const UNITS = [HOURS, MINUTES, SECONDS];

export const formatDuration = (num: number): string => {
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
