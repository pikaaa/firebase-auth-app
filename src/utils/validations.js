export const validateEmail = ( email: string ) => {
  const re = new RegExp( [ '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)',
    '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
    '[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+',
    '[a-zA-Z]{2,}))$' ].join( '' ) );
  return re.test( email );
};
