# List all folders in a given directory ($1)
# => See https://unix.stackexchange.com/questions/86722/how-do-i-loop-through-only-directories-in-bash
for d in $1*/ ; do
    echo "current: $d"
    #rename ' - ' '-' $d # doesn't work on windows, even with bash install. rename require to install through apt-get.
    #rename ' ' '.' $d # doesn't work on windows, even with bash install. rename require to install through apt-get.
    amendedDir="${d// /\\\ }"
    echo "amendedDir: $amendedDir"
    newDir="${d// /.}"
    echo "newDir: $newDir"
    # In general, it is a good idea to put double-quotes around every reference to a shell variable.
    # ${f/ /} removes just the first occurrence of a space. To remove all spaces, use ${f// /}.
    # => See https://stackoverflow.com/questions/26519301/bash-error-renaming-files-with-spaces-mv-target-is-not-a-directory
    mv "$d" "${d// /.}"
    finalDir="${newDir/\.\-\./\-}"
    echo "finalDir: $finalDir"
    mv "$newDir" "$finalDir"
done