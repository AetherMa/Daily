import { useEffect, useState } from 'react';

const getGreetingInfo = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) {
    return {
      greeting: '早安',
      note: '今天也要好好记录温柔的小事。'
    };
  }
  if (hour >= 11 && hour < 17) {
    return {
      greeting: '午安',
      note: '午后的阳光很好，来写点甜甜的心情吧。'
    };
  }
  return {
    greeting: '晚安',
    note: '把今天的心跳写进日记，做个好梦。'
  };
};

export default function useGreeting() {
  const [info, setInfo] = useState(getGreetingInfo());

  useEffect(() => {
    const timer = setInterval(() => {
      setInfo(getGreetingInfo());
    }, 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  return info;
}
