const NewUser = (user) => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

  localStorage.setItem('currentUser', JSON.stringify(Object.keys(user)[0]));
};

export default NewUser;
