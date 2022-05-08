// Print Incident tokens
#define main incimain
#include "/opt/incident/incident.c"
#undef main
#define uchar unsigned char
void print_escaped(uchar* str, int count);

int main(int argc, char *argv[])
{
	int len = 0;
	uchar* str = malloc_slurp_file(argv[1], &len);
	if (!str) return -1; /* malloc_slurp_file prints the error message */

	/* Lexically parse the input. */
	int parsed[len];
	lexical_parse(str, parsed, len);

	int n=1;
	for(int i=0; i<len; )
	{
		if(parsed[i] < 3) {i++; continue;} // not a command

		int id = parsed[i]; // id of current incidence of current command
		int start = i; // starting index of current incidence of current command

		while(i<len && parsed[i]==id) i++; // skip to the end of current incidence
		printf("%d:", n++);
		print_escaped(str+start, i-start);
		printf(" ");
	}

}

void print_escaped(uchar* str, int count)
{
	for(int i=0; i<count; i++)
	{
		uchar c = str[i];
		if(c <= 127) printf("%c", c);
		else printf("\\x%.2X", c);
	}
}
