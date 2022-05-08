// copy of https://github.com/aaronryank/c-prohackr112/blob/master/morse.c (unavail now)
#include <stdio.h>
#include <string.h>
#include <errno.h>

void morse(char*);

int main(int argc, char **argv)
{
    if (argc != 2) {
        fprintf(stderr,"Usage: morse file.what\n");
        return -1;
    }

    FILE *in = fopen(argv[1],"r");

    if (!in) {
        fprintf(stderr,"Error opening file %s: %s\n",argv[1],strerror(errno));
        return -1;
    }

    char buf[10000];
    while (1) {
        if (fscanf(in,"%s ",&buf) == EOF)
            return 0;
        if (strspn(buf,"-.") == strlen(buf))
            morse(buf);
    }
}


// https://codegolf.stackexchange.com/a/18069
char n,t,m[9],*c=" etianmsurwdkgohvf l pjbxcyzq  54 3   2& +    16=/   ( 7   8 90    $       ?_    \"  .    @   '  -        ;! )     ,    :";

void morse(char *m)
{
    for(t=m[6]=n=0;m[n];n++)t+=t+1+(m[n]&1);putchar(c[t]);
}
