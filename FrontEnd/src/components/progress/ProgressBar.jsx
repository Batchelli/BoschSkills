import React, { useEffect, useState } from 'react';
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ progress, atualizarProgresso }) => {
  const [autoIncrease, setAutoIncrease] = useState(false);

  useEffect(() => {
    let interval;
    if (autoIncrease && progress < 100) {
      interval = setInterval(() => {
        atualizarProgresso(prevProgress => {
          const newProgress = prevProgress + 1;
          if (newProgress >= 100) {
            setAutoIncrease(false);
          }
          return newProgress;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [autoIncrease, progress, atualizarProgresso]);

  const increaseProgress = () => {
    if (progress >= 100) {
      atualizarProgresso(0);
    } else {
      setAutoIncrease(true);
    }
  };

  return (
    <div className={styles.progress_container}>
      <button onClick={increaseProgress}>Aumentar Progresso</button>
      <div className={styles.progress_wrapper}>
        <div
          className={styles.progress_bar}
          style={{ width: `${progress}%`, backgroundColor: '#791d73' }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;












// const ProgressBar = ({ progress }) => {
//   const radius = 20;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (progress / 100) * circumference;

//   return (
//     <div className={styles.progress_bar}>
//       <svg width="50" height="50">
//         <circle
//           className={styles.progress_bar__track}
//           cx="25"
//           cy="25"
//           r={radius}
//         />
//         <circle
//           className={styles.progress_bar__progress}
//           cx="25"
//           cy="25"
//           r={radius}
//           strokeDasharray={circumference}
//           strokeDashoffset={offset}
//         />
//       </svg>
//       <div className={styles.progress_bar__label}>{`${progress}%`}</div>
//     </div>
//   );
// };

// export default ProgressBar;


