const turnDateStringToToday = (dateString) => {
    const today = new Date();
    const todayString = today.toISOString().substring(0, 10);
    return dateString.replace(/^.{10}/, todayString);
};

export {
    turnDateStringToToday
};
