// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Notes {
    // Structure to store note details
    struct Note {
        uint256 id;
        address owner;
        bytes content;
    }

    // Mapping from note ID to Note
    mapping(uint256 => Note) private notes;
    // Mapping from user address to array of note IDs
    mapping(address => uint256[]) private userNotes;

    // Auto-incrementing note ID
    uint256 private nextNoteId;

    // Events for note actions
    event NoteCreated(uint256 indexed id, address indexed owner);
    event NoteUpdated(uint256 indexed id);
    event NoteDeleted(uint256 indexed id);

    // Modifier to check if the caller is the owner of the note
    modifier onlyOwner(uint256 _id) {
        require(notes[_id].owner != address(0), "Note does not exist");
        require(notes[_id].owner == msg.sender, "Not the note owner");
        _;
    }

    // Function to create a new note
    function createNote(bytes memory _content) public {
        notes[nextNoteId] = Note({
            id: nextNoteId,
            owner: msg.sender,
            content: _content
        });
        userNotes[msg.sender].push(nextNoteId);

        emit NoteCreated(nextNoteId, msg.sender);
        ++nextNoteId;
    }

    // Function to get a note by ID
    function getNote(uint256 _id) public view onlyOwner(_id) returns (bytes memory) {
        return notes[_id].content;
    }

    // Function to update a note
    function updateNote(uint256 _id, bytes memory _content) public onlyOwner(_id) {
        notes[_id].content = _content;
        emit NoteUpdated(_id);
    }

    // Function to delete a note
    function deleteNote(uint256 _id) public onlyOwner(_id) {
        delete notes[_id];

        uint256[] storage myNotes = userNotes[msg.sender];
        for (uint256 i = 0; i < myNotes.length; i++) {
            if(myNotes[i] == _id){
                if (i != myNotes.length - 1) {
                    myNotes[i] = myNotes[myNotes.length - 1];
                }
                myNotes.pop();
                break;
            }
        }

        emit NoteDeleted(_id);
    }

    // Function to get all note IDs owned by the caller
    function getMyNotes() public view returns (uint256[] memory) {
        return userNotes[msg.sender];
    }
}
