import { prisma }
from "@/src/lib/prisma";

export async function
expenseByCategory(
tripId:string
){

const data=
await prisma.expense
.groupBy({

by:[
"category"
],

where:{
tripId
},

_sum:{
amount:true
}

});

return data.map(
item=>({

name:
item.category,

value:
item._sum.amount
??0

})
);

}