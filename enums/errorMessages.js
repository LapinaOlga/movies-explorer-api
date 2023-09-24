module.exports.ERROR_MESSAGES = {
  errors: {
    badRequest: 'Данные указаны неверно',
    movieIsUndefined: 'Фильм не найден',
    pageNotFound: 'Страница не найдена',
    unauthorized: 'Необходима авторизация',
    credentialsAreNotCorrect: 'Неправильные почта или пароль',
    userHasAlreadyExisted: 'Пользователь с таким email уже существует',
    youCantDeleteNotYourOwnMovied: 'Вы не можете удалять чужие фильмы',
    undefined: 'Произошла непредвиденная ошибка',
  },
  validation: {
    movie: {
      id: {
        notCorrect: 'ID фильма указан неверно',
        string: 'ID фильма должно быть строкой',
        required: 'ID фильма обязательно к заполнению',
        hex: 'ID фильма может состоять только из символов 0-9, a-f',
        length: 'ID фильма должно состоять из 24 символов',
      },
      country: {
        required: 'Поле country обязательно к заполнению',
        string: 'Поле country должно быть строкой',
      },
      director: {
        required: 'Поле director обязательно к заполнению',
        string: 'Поле director должно быть строкой',
      },
      duration: {
        required: 'Поле duration обязательно к заполнению',
        number: 'Поле duration должно быть числом',
      },
      year: {
        required: 'Поле year обязательно к заполнению',
        number: 'Поле year должно быть числом',
      },
      description: {
        required: 'Поле description обязательно к заполнению',
        string: 'Поле description должно быть строкой',
      },
      image: {
        required: 'Поле image обязательно к заполнению',
        url: 'Поле image содержит невалидный url',
        string: 'Поле image должно быть строкой',
      },
      trailerLink: {
        required: 'Поле trailerLink обязательно к заполнению',
        url: 'Поле trailerLink содержит невалидный url',
        string: 'Поле trailerLink должно быть строкой',
      },
      thumbnail: {
        required: 'Поле thumbnail обязательно к заполнению',
        url: 'Поле thumbnail содержит невалидный url',
        string: 'Поле thumbnail должно быть строкой',
      },
      movieId: {
        required: 'Поле movieId обязательно к заполнению',
        number: 'Поле movieId должно быть числом',
      },
      nameRu: {
        required: 'Поле nameRU обязательно к заполнению',
        string: 'Поле nameRU должно быть строкой',
      },
      nameEn: {
        required: 'Поле nameEN обязательно к заполнению',
        string: 'Поле nameEN должно быть строкой',
      },
    },
    user: {
      email: {
        required: 'Поле email обязательно к заполнению',
        email: 'Поле email должно быть валидным email-адресом',
        string: 'Поле email должно быть строкой',
      },
      password: {
        required: 'Поле password обязательно к заполнению',
        string: 'Поле password должно быть строкой',
        minLength: 'Поле password не может быть короче 8 символов',
      },
      name: {
        required: 'Поле name обязательно к заполнению',
        minLength: 'Поле name не может быть короче 2х символов',
        maxLength: 'Поле name не может быть длиннее 30 символов',
        string: 'Поле name должно быть строкой',
      },
    },
  },
};
