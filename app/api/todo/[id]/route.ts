import getCurrentUser from "actions/getCurrentUser";
import { prisma } from "app/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
 { params }: { params: { id : string }}
) {
  try {
    // Create the task in the database 
    const user = await getCurrentUser()

    console.log('PARAMS: ', params.id)

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.id) {
      return new NextResponse("Todo ID is required" , { status: 400 })
    } 

    const task = await prisma.todo.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    })

    if (!task) {
      return new NextResponse("Task not found", { status: 404})
    }

    const deletedTask = await prisma.todo.delete({
      where: {
        id: task.id, // Ensure deleting the correct task by id
      }, 
    })

    // Return the deleted task as JSON
    return NextResponse.json(deletedTask);

  } catch (error) {
    console.log("[TODO_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}