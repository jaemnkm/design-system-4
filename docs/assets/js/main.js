import { Tabs } from 'govuk-frontend';
import Expandable from '@cfpb/expandables/src/Expandable';
import Table from '@cfpb/tables/src/Table';

Expandable.init();
Table.init();

const main = document.querySelector( 'main.content' );
const tabs = document.querySelectorAll( '[data-module="tabs"]' );

if ( tabs ) {
  main.classList.add( 'js-enabled' );
  for ( let i = 0; i < tabs.length; i++ ) {
    const tab = tabs[i];
    new Tabs( tab ).init( );
  }
}

const HIDDEN_CLASS = 'u-hidden';
const toggleButton = document.getElementById( 'toggle-code-btn' );
const codeSnippets = document.querySelectorAll( '[data-toggle-code]' );

const hideEls = els => els.forEach( el => el.classList.add( HIDDEN_CLASS ) );
const showEls = els => els.forEach( el => el.classList.remove( HIDDEN_CLASS ) );

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

/**
 * Create permalink elements for easy copy/paste of anchor links on specified heading elements.
 * @param {HTMLNode} headings - List of target heading DOM elements, e.g. all <h3>'s
 */
function addPermalinks( headings ) {
  const iconLink = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 929.5 1200" class="cf-icon-svg"><path d="M894.4 702.8L731.3 539.7c-46.9-46.8-122.8-46.8-169.7 0l-34.9 34.9-53.2-53.2 34.4-34.4c46.8-46.9 46.8-122.8 0-169.7L344.8 154.2c-46.9-46.8-122.8-46.8-169.7 0l-140 140c-46.8 46.9-46.8 122.8 0 169.7L198.2 627c46.9 46.8 122.8 46.8 169.7 0l34.9-34.9 53.2 53.2-34.4 34.4c-46.8 46.9-46.8 122.8 0 169.7l163.1 163.1c46.9 46.8 122.8 46.8 169.7 0l140-140c46.8-46.9 46.8-122.8 0-169.7zM297.2 556.2c-7.9 7.7-20.4 7.7-28.3 0l-163.1-163c-7.7-7.9-7.7-20.4 0-28.3l140-140c7.9-7.7 20.4-7.7 28.3 0l163 163.1c7.7 7.9 7.7 20.4 0 28.3l-34.4 34.4-55.5-55.5c-19.6-19.4-51.3-19.3-70.7.3-19.3 19.5-19.3 50.9 0 70.4l55.6 55.6-34.9 34.7zm526.5 245.6l-140 140c-7.9 7.7-20.4 7.7-28.3 0L492.3 778.7c-7.7-7.9-7.7-20.4 0-28.3l34.4-34.4 55.5 55.5c19.4 19.6 51.1 19.7 70.7.3s19.7-51.1.3-70.7l-.3-.3-55.5-55.5 34.9-34.9c7.9-7.7 20.4-7.7 28.3 0l163.1 163.1c7.7 7.9 7.7 20.4 0 28.3z"/></svg>';

  for ( let i = 0; i < headings.length; i++ ) {
    const heading = headings[i];
    const href = heading.getAttribute( 'id' );
    if ( href ) {
      // create href with id of heading
      const link = document.createElement( 'a' );
      link.setAttribute( 'href', '#' + href );
      link.setAttribute( 'data-anchor-link', '' );
      link.innerHTML = ' ' + iconLink + ' <small class="u-visually-hidden">Copy link to #' + href + ' section of this page</small>';
      // Title attribute is only useful as a hint to sighted users, screen readers need the actual link text above.
      link.setAttribute( 'title', 'Copy link to #' + href + ' section of this page' );
      // append to heading
      heading.appendChild( link );
    }

  }

  /**
   * Add event listener to copy on click the anchor link href value for permalink icons next to headings.
   */
  const permalinks = document.querySelectorAll( '[data-anchor-link]' );

  permalinks.forEach(
    permalink => permalink.addEventListener( 'click', ev => {
      const href = ev.currentTarget.href;
      copyAnchorLink( ev.currentTarget );
    } )
  );

}

/**
 * Get href value and copy to clipboard
 * @param {HTMLNode} linkEl - <a> anchor link element created in addPermalinks()
 */
function copyAnchorLink( linkEl ) {
  const range = document.createRange();
  const linkText = linkEl.innerHTML;
  const linkURL = linkEl.href;
  // hackx to set the link text to equal the link url so we can select it and copy it to clipboard
  linkEl.innerHTML = linkURL;
  range.selectNodeContents( linkEl );

  window.getSelection().addRange( range );

  try {
    // Now that we've selected the anchor text, execute the copy command
    const successful = document.execCommand( 'copy' );
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log( 'Copy email command was ' + msg );
  } catch ( err ) {
    console.log( 'Oops, unable to copy' );
  }

  // Remove the selections - NOTE: Should use
  // removeRange(range) when it is supported
  window.getSelection().removeAllRanges();
  linkEl.innerHTML = linkText;

}

const h3Els = document.querySelectorAll( '.content_main h3' );
addPermalinks( h3Els );
