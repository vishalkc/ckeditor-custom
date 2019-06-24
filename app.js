import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import List from '@ckeditor/ckeditor5-list/src/list';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import MentionTab from './mentiontab/mentiontab'; 
import Mention from '@ckeditor/ckeditor5-mention/src/mention';

import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import MentionShortcut from './mentionshortcut/mentionshortcut';
import MentionLink from './mentionlink/mentionlink';

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ Essentials, Paragraph, Heading, List, Bold, Italic, 
                   Mention, MentionTab, MentionShortcut, MentionLink ],
        //toolbar: [ 'heading', 'bold', 'italic', 'numberedList', 'bulletedList' ],
        mention: {
            feeds: [
              {
                marker: 'ǂ',
                feed: getFeedItems,//[ '@a - Corporate Name', '@b - Subordinate Unit', '@c - Location of meeting' ],
                minimumCharacters: 0,
                itemRenderer: customItemRenderer
              }
            ]
          },
    } )
    .then( editor => {
        console.log( 'Editor was initialized', editor );

        CKEditorInspector.attach( 'editor', editor );
        
        editor.execute('keypress',{value:'tab'});            
        editor.execute('mentionshortcut',{key:'Ctrl+d', marker: 'ǂ'}); 
        editor.execute('mentionlink',{
            linkData:'1001', 
            linkurl: 'http://www.google.com',
            linkAttribute: 'linkHref'
        }); 
        window.editor = editor;
    } )
    .catch( error => {
        console.error( error.stack );
    } );

    function getFeedItems( queryText ){
        // As an example of an asynchronous action, return a promise
        // that resolves after a 100ms timeout.
        // This can be a server request or any sort of delayed action.
        return new Promise( resolve => {
            setTimeout( () => {
              let items = [
                { id: 'ǂa', userId: '1', name: 'a - Barney Stinson', link: 'https://www.imdb.com/title/tt0460649/characters/nm0000439' },
                { id: 'ǂb', userId: '2', name: 'b - Lily Aldrin', link: 'https://www.imdb.com/title/tt0460649/characters/nm0004989' },
                { id: 'ǂc', userId: '3', name: 'c - Marshall Eriksen', link: 'https://www.imdb.com/title/tt0460649/characters/nm0781981' },
                { id: 'ǂd', userId: '4', name: 'd - Robin Scherbatsky', link: 'https://www.imdb.com/title/tt0460649/characters/nm1130627' },
                { id: 'ǂe', userId: '5', name: 'e - Ted Mosby', link: 'https://www.imdb.com/title/tt0460649/characters/nm1102140' }
            ];
                //console.log(items);
                const itemsToDisplay = items
                    // Filter out the full list of all items to only those matching the query text.
                    .filter( isItemMatching )
                    // Return 10 items max - needed for generic queries when the list may contain hundreds of elements.
                    .slice( 0, 10 );
    
                resolve( itemsToDisplay );
            }, 100 );
        } );
    
        // Filtering function - it uses `name` and `username` properties of an item to find a match.
        function isItemMatching( item ) {
            // Make the search case-insensitive.
            const searchString = queryText.toLowerCase();
    
            // Include an item in the search results if name or username includes the current user input.
            return (
                item.name.toLowerCase().includes( searchString ) ||
                item.id.toLowerCase().includes( searchString )
            );
        }
    }
    
    function customItemRenderer( item ) {
        const itemElement = document.createElement( 'p' );
    
         itemElement.classList.add( 'custom-item' );
         itemElement.id = `mention-list-item-id-${ item.userId }`;
         itemElement.textContent = `${ item.name } `;
    
        const usernameElement = document.createElement( 'span' );
        usernameElement.classList.add( 'custom-item' );
        //usernameElement.textContent = item.name;
        //usernameElement.id = `mention-list-item-id-${ item.userId }`
        itemElement.appendChild(usernameElement);
    
        return itemElement;
    }