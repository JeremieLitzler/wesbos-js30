# List all folders in a given directory ($1)
# => See https://unix.stackexchange.com/questions/86722/how-do-i-loop-through-only-directories-in-bash
for d in $1*/ ; do
    echo "current: $d"
    rm -R $d/*
    touch $d/.gitempty
done