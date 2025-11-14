namespace ust.sneha.kancharla.reuse;

type Gender : String(1) enum { M; F; };

type phno : String(30)
  @assert.format : '^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$';

type email : String(255)
  @assert.format : '^[a-zA-Z0-9._%+-]+@itelo\.info$';