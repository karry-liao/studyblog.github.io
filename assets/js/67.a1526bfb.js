(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{837:function(t,a,s){"use strict";s.r(a);var v=s(16),_=Object(v.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"堆与栈的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#堆与栈的区别"}},[t._v("#")]),t._v(" 堆与栈的区别")]),t._v(" "),a("h3",{attrs:{id:"栈简介"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#栈简介"}},[t._v("#")]),t._v(" 栈简介")]),t._v(" "),a("p",[t._v("栈由操作系统自动分配释放，用于存放函数的参数值，局部变量等，其操作方式类似于数据结构中的栈。")]),t._v(" "),a("p",[t._v("其中函数中定义的局部变量按照先后定义的顺序依次压入栈中，也就是说相邻变量的地址之间不会存在其它变量。栈的内存地址生长方向与堆相反，由高到底，所以后定义的变量地址低于先定义的变量，比如上面代码中变量 s 的地址小于变量 b 的地址，p2 地址小于 s 的地址。栈中存储的数据的生命周期随着函数的执行完成而结束。")]),t._v(" "),a("h3",{attrs:{id:"堆简介"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#堆简介"}},[t._v("#")]),t._v(" 堆简介")]),t._v(" "),a("p",[t._v("堆由开发人员分配和释放， 若开发人员不释放，程序结束时由 OS 回收，分配方式类似于链表")]),t._v(" "),a("p",[t._v("堆的内存地址生长方向与栈相反，由低到高，但需要注意的是，后申请的内存空间并不一定在先申请的内存空间的后面，即 p2 指向的地址并不一定大于 p1 所指向的内存地址，原因是先申请的内存空间一旦被释放，后申请的内存空间则会利用先前被释放的内存，从而导致先后分配的内存空间在地址上不存在先后关系。堆中存储的数据若未释放，则其生命周期等同于程序的生命周期。")]),t._v(" "),a("h3",{attrs:{id:"堆与栈区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#堆与栈区别"}},[t._v("#")]),t._v(" 堆与栈区别")]),t._v(" "),a("p",[t._v("堆与栈实际上是操作系统对进程占用的内存空间的两种管理方式，主要有如下几种区别：")]),t._v(" "),a("p",[t._v("（1）管理方式不同。栈由操作系统自动分配释放，无需我们手动控制；堆的申请和释放工作由程序员控制，容易产生内存泄漏；")]),t._v(" "),a("p",[t._v("（2）空间大小不同。每个进程拥有的栈的大小要远远小于堆的大小。理论上，程序员可申请的堆大小为虚拟内存的大小，进程栈的大小 64bits 的 Windows 默认 1MB，64bits 的 Linux 默认 10MB；")]),t._v(" "),a("p",[t._v("（3）生长方向不同。堆的生长方向向上，内存地址由低到高；栈的生长方向向下，内存地址由高到低。")]),t._v(" "),a("p",[t._v("（4）分配方式不同。堆都是动态分配的，没有静态分配的堆。栈有2种分配方式：静态分配和动态分配。静态分配是由操作系统完成的，比如局部变量的分配。动态分配由alloca函数进行分配，但是栈的动态分配和堆是不同的，他的动态分配是由操作系统进行释放，无需我们手工实现。")]),t._v(" "),a("p",[t._v("（5）分配效率不同。栈由操作系统自动分配，会在硬件层级对栈提供支持：分配专门的寄存器存放栈的地址，压栈出栈都有专门的指令执行，这就决定了栈的效率比较高。堆则是由C/C++提供的库函数或运算符来完成申请与管理，实现机制较为复杂，频繁的内存申请容易产生内存碎片。显然，堆的效率比栈要低得多。")]),t._v(" "),a("p",[t._v("（6）存放内容不同。栈存放的内容，函数返回地址、相关参数、局部变量和寄存器内容等。当主函数调用另外一个函数的时候，要对当前函数执行断点进行保存，需要使用栈来实现，首先入栈的是主函数下一条语句的地址，即扩展指针寄存器的内容（EIP），然后是当前栈帧的底部地址，即扩展基址指针寄存器内容（EBP），再然后是被调函数的实参等，一般情况下是按照从右向左的顺序入栈，之后是被调函数的局部变量，注意静态变量是存放在数据段或者BSS段，是不入栈的。出栈的顺序正好相反，最终栈顶指向主函数下一条语句的地址，主程序又从该地址开始执行。堆，一般情况堆顶使用一个字节的空间来存放堆的大小，而堆中具体存放内容是由程序员来填充的。")]),t._v(" "),a("h1",{attrs:{id:"数据结构中的堆与栈"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#数据结构中的堆与栈"}},[t._v("#")]),t._v(" 数据结构中的堆与栈")]),t._v(" "),a("p",[t._v("数据结构中，堆与栈是两个常见的数据结构，理解二者的定义、用法与区别，能够利用堆与栈解决很多实际问题。")]),t._v(" "),a("h3",{attrs:{id:"栈简介-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#栈简介-2"}},[t._v("#")]),t._v(" 栈简介")]),t._v(" "),a("p",[t._v("栈是一种运算受限的线性表，其限制是指只仅允许在表的一端进行插入和删除操作，这一端被称为栈顶（Top），相对地，把另一端称为栈底（Bottom）。把新元素放到栈顶元素的上面，使之成为新的栈顶元素称作进栈、入栈或压栈（Push）；把栈顶元素删除，使其相邻的元素成为新的栈顶元素称作出栈或退栈（Pop）。这种受限的运算使栈拥有“先进后出”的特性（First In Last Out），简称FILO。")]),t._v(" "),a("p",[t._v("栈分顺序栈和链式栈两种。栈是一种线性结构，所以可以使用数组或链表（单向链表、双向链表或循环链表）作为底层数据结构。使用数组实现的栈叫做顺序栈，使用链表实现的栈叫做链式栈，二者的区别是顺序栈中的元素地址连续，链式栈中的元素地址不连续。")]),t._v(" "),a("p",[t._v("栈的基本操作包括初始化、判断栈是否为空、入栈、出栈以及获取栈顶元素等。")]),t._v(" "),a("h3",{attrs:{id:"堆简介-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#堆简介-2"}},[t._v("#")]),t._v(" 堆简介")]),t._v(" "),a("p",[t._v("堆是一种常用的树形结构，是一种特殊的完全二叉树，当且仅当满足所有节点的值总是不大于或不小于其父节点的值的完全二叉树被称之为堆。堆的这一特性称之为堆序性。因此，在一个堆中，根节点是最大（或最小）节点。如果根节点最小，称之为小顶堆（或小根堆），如果根节点最大，称之为大顶堆（或大根堆）。堆的左右孩子没有大小的顺序。")]),t._v(" "),a("p",[t._v("堆的存储一般都用数组来存储堆，i节点的父节点下标就为( i – 1 ) / 2 (i – 1) / 2(i–1)/2。它的左右子节点下标分别为 2 ∗ i + 1 2 * i + 12∗i+1 和 2 ∗ i + 2 2 * i + 22∗i+2。如第0个节点左右子节点下标分别为1和2。")])])}),[],!1,null,null,null);a.default=_.exports}}]);