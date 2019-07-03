// The edit button href is now generated server-side

const HIDDEN_CLASS = 'u-hidden';
const toggleButton = document.getElementById( 'toggle-code-btn' );
const codeSnippets = document.querySelectorAll( '[data-toggle-code]' );

hideEls = els => els.forEach( el => el.classList.add( HIDDEN_CLASS ) );
showEls = els => els.forEach( el => el.classList.remove( HIDDEN_CLASS ) );

toggleButton.addEventListener( 'click', ev => {
  ev.preventDefault();
  const codeIsHidden = toggleButton.getAttribute( 'data-code-hidden' );
  if ( codeIsHidden ) {
    showEls( codeSnippets );
    toggleButton.removeAttribute( 'data-code-hidden' );
  } else {
    hideEls( codeSnippets );
    toggleButton.setAttribute( 'data-code-hidden', 'true' );
  }
} );
