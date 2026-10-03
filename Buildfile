OBJECTS = a.o b.o

INPUTS = %.c common.h

$(OBJECTS): %.o: $(INPUTS)

