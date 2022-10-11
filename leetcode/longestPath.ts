/**
 *
 * @param fileSystem {String} file paths where \n\t is subdirectory and \t*.* is a file e.g.
 *  Where input is
 * user\n\tpictures\n\t\tphoto.png\n\t\tcamera\n\tdocuments\n\t\tlectures\n\t\t\tnotes.txt
 * Then longest path (including / character) is user/documents/lectures/notes.txt -> 33
 * Where input is
 * user\n\tpictures\n\tdocuments\n\t\tnotes.txt
 * Then longest path is user/documents/notes.txt -> 24
 *
 * Solution:
 * The longest path is the deepest directory with a file
 *
 * Where splitting on \n indicates subdirectory
 * And \t indicates level
 *
 * @returns {Number} maximum file path
 */

const NEWLINE_CHAR = "\n";
const TAB_CHAR = "\t";

function longestPath(fileSystem: string): number {
  console.log(`calculating longest path for: \n`, fileSystem);
  let path: string[] = [];
  let maxLength = 0;
  const directories = fileSystem.split(NEWLINE_CHAR);

  // [user, \tpictures, \tdocuments, \t\tnotes.txt]
  console.log(directories);

  // for each directory
  for (let directory of directories) {
    const tabs = directory.split(TAB_CHAR);

    // update path for current subdirectory
    path = path.slice(0, tabs.length - 1);
    const subdirectory = tabs[tabs.length - 1];
    console.log(
      "directory: ",
      directory,
      ", tabs: ",
      tabs,
      ", path: ",
      path,
      ", subdirectory: ",
      subdirectory
    );

    path.push(subdirectory); // [5, 14, 15]
    if (directory.includes(".")) {
      const pathLength = path.join("/").length;
      maxLength = Math.max(maxLength, pathLength);
    }
  }
  return maxLength;
}

const fileSystem = `user${NEWLINE_CHAR}${TAB_CHAR}pictures${NEWLINE_CHAR}${TAB_CHAR}documents${NEWLINE_CHAR}${TAB_CHAR}${TAB_CHAR}notes.txt`;
const result = longestPath(fileSystem);
console.log("result: ", result);
