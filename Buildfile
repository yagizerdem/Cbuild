SHELL = /bin/bash
.SHELLFLAGS = -c

 BASE = old 
 LIST := initial
 
 LIST += $(BASE)
 
 BASE = new

 app: 
	@echo $(LIST)