# Cardovar

Cardovar is a small SPA designed to store, show and use *Cards* - special components with an image, text and tags. You can add new cards and edit existing; hide or unhide cards; group cards into albums; filter by tags, add, edit and delete tags (individualy or using selection mode).

#### Please, note, that all changes you make are persist until the page is reloaded - at the moment the app is frontend-only and has no actual server which will store all changes made by you; the current database (in the form of JSON) is stored on a [n:point](https://www.npoint.io/ "n:point") site and all images are uploaded to [imgbb](https://imgbb.com "imgbb") using their respective APIs.



## Table of contents
* [Card](#usage)
  * [Front](#pricing-method)
  * [Back](#distances-source)
  
## Card

All cards have two sides - **front** and **back**. You can switch between them (turn them) by clicking on any place on the map except *buttons 1-3*.

### Front

On the front of the card are the *card title*, *image*, *short description* and *buttons 1-3*:

1. **Duplicate card [1]:** creates an exact copy of the card.
2. **Edit card [2]:** lets you edit all of the card's information.
3. **Open full image [3]:** opens a full version of image.

![Card Front](https://i.imgur.com/HGXaGdk.png "Card Front")

### Back

On the back of the card are the *full description* and *tags*:

![Card Back](https://i.imgur.com/KSPAafs.png "Card Back")