---
title: Understanding Linux File Permissions (Part 1)
date: '2019-07-21' 
spoiler: Blue Shirt. Blue Jeans.
---

## Linux File Permissions  
Running the `ls -l` command on your terminal shows a similar output like so:

![ls-l output](./ls-l.png)

This output forms the very basis of permissions(mode) for files and directories.

<!-- 
`drwxr-xr-x 3 root root   4096 Jul 16 13:52 seniorman` -->

## Read. Write. Execute.
Three characters that we'll be seeing a lot are `r`, `w` and `x` which mean read, write and execute permissions respectively. Whenever we refer to permissions, we'd be using the combination of these three letters to describe it. 

#### Some Examples 
* `rwx` means Read, Write and Execute permissions are granted on the resource.
* `r-x` means Read and Execute permissions.
* `-w-` means only Write permission. 


From the earlier output, we inspect `drwxr-xr-x`. This is divided into 4 parts
1. The type of resource; `-` for a file, `l` for a symbolic link and `d` for a directory. Here it's a directory.
2. The permissions for the user (owner of the file). `rwx`:  Read, Write and Execute.
3. The permissions for members of the file's group. `r-x`: Read and Execute.
4. The permissions available to all users. `r-x`: Read and Execute.

Note that order of the output would always be like this.

## Changing Permissions
Permissions are also called modes. Hence the command used for changing permissions is called `chmod` which is short for **change mode**.

The format for changing permissions is:

`chmod mode file`
 
There are two notations for specifying the mode:
1.  Symbolic Notation
2.  Numeric Notation

### Symbolic Notation
To set permissions using symbolic notation, run:

`chmod mode file`


The `mode` here is a combination of the User Category, Operator and Permission.
* User Category: The category which permissions are to be altered. The options include:
    1. `u` : user
    2. `g` : group
    3. `o` : other
    4. `a` : all
* Operator: Used to alter permissions: They include:
    1. + : Add permission
    2. - : Remove permission
    3. = : Set permission
* Permission: The permissions. `rwx`

#### Examples  
Say we have a file named der;

|  Example                    | Description                                |
|-----------------------------|--------------------------------------------|
|  `chmod g+w der`            |   Add write permission to the files group  |
|  `chmod u-wr der`           | Remove write and read for user             |
|  `chmod u+rwx,g-w der`      | Add all for user and remove write for group|
|  `chmod a=wr der`           | Set all to write and read only             |
|  `chmod o= der`             | Set others to ---                          |

 
 ### Numeric Notation
Let's start by representing the value for off with `0` and on with `1`. The table below shows the relationship betweeen the binary representation and string representation of permissions.

|  Binary Representation      | String Representation                      |
|-----------------------------|--------------------------------------------|
|  0  | --- |
|  1  | --x |
|  10 | -w- |
|  11 | -wx |
|  100| r-- |
|  101| r-x |
|  110| rw- |
|  111| rwx |

To get a Numeric value that we can use with the `chmod` command, we convert the binary representation to base 10 or decimal. Hence:

|  Binary Representation      | Octal Representation                      |
|-----------------------------|--------------------------------------------|
|  0  | 0 |
|  1  | 1 |
|  10 | 2 |
|  11 | 3 |
|  100| 4 |
|  101| 5 |
|  110| 6 |
|  111| 7 |

A quick way to remember this is to know that READ is 4, WRITE is 2 and EXECUTE is 1. Then to get the permission all you have to do is add the values for all 3. 

Say I want to give a file read and write permissions, that'll be 4 + 2 = 6.

Note that 0 means no read, write and execute permissions.


|  Numeric Notation      | Symbolic Notation                      |
|-----------------------------|--------------------------------------------|
|  000  | ---------- |
|  700  | -rwx-------|
|  755 | -rwxr-xr-x |
|  644 | -rw-r--r-- |
|  766| -rwxrw-rw- |
|  660| -rw-rw---- | 
|  400| -r-------- |

So to change the permissions using this, use `chmod 700 der` e.t.c


