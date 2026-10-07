################################################################################
### CUSTOMIZE BELOW HERE #######################################################

CC=gcc # define the compiler to use
TARGET=runme # define the name of the executable
SOURCES=main.c functions.c
CFLAGS=-O3
LFLAGS=-lm

################################################################################
### DO NOT EDIT THE FOLLOWING LINES ############################################

# the target is obtained linking all .o files
all: $(SOURCES) $(TARGET)

$(TARGET): main.o functions.o
	$(CC) $(LFLAGS) main.o functions.o -o $(TARGET)

main.o: main.c
	$(CC) $(CFLAGS) -c main.c -o main.o

functions.o: functions.c
	$(CC) $(CFLAGS) -c functions.c -o functions.o

purge: clean
	rm -f $(TARGET)

clean:
	rm -f *.o

################################################################################
################################################################################
