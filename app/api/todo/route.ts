import { NextResponse } from "next/server";
import { prisma } from "app/lib/prisma"; 
import getCurrentUser from "actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Destructure the incoming task data
    const { title, isCompleted } = body;

    // Create the task in the database 
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const task = await prisma.todo.create({
      data: {
        userId: user?.id,
        title,
        isCompleted
      },
    });

    // Return the newly created task as JSON
    return NextResponse.json(task);

  } catch (error) {
    console.log("[TODO_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
  
    // Create the task in the database 

    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const todos = await prisma.todo.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    // Return the fetched todos as JSON
    return NextResponse.json(todos);

  } catch (error) {
    console.log("[TODO_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    // Destructure the incoming task data
    const { id, title, isCompleted } = body;

    // Create the task in the database 
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const task = await prisma.todo.findFirst({
      where: {
        id,
        userId: user.id // Ensure the task is belong to the authenticated user
      }
    })

    if (!task) {
      return new NextResponse("Task not found", { status: 404})
    }

    const updatedTask = await prisma.todo.update({
      where: {
        id: task.id, // Ensure updating the correct task by id
      }, 
      data: {
        isCompleted: isCompleted,
        title: title || task.title
      }
    })

  
    return NextResponse.json(updatedTask);

  } catch (error) {
    console.log("[TODO_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}





