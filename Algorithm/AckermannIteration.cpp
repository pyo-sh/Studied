#include<stdio.h>
int Ackermann(int m, int n) {
	int list[100000];
	int esp = 0;
	list[esp++] = m;
	list[esp] = n;
	while (true) {
		if (esp == 0) {
			return list[esp];
		}
		else if (list[esp - 1] == 0) {
			list[esp - 1] = list[esp] + 1;
			esp = esp - 1;
		}
		else if (list[esp] == 0) {
			list[esp - 1] = list[esp - 1] - 1;
			list[esp] = 1;
		}
		else {
			list[esp + 1] = list[esp] - 1;
			list[esp] = list[esp - 1];
			list[esp - 1] = list[esp - 1] - 1;
			esp = esp + 1;
		}
	}
}

void main(void) {
	printf("%d\n", Ackermann(3,2));
}
