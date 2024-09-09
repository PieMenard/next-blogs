import { prisma } from '@/app/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

async function fetchPost(id: string) {
  const response = await prisma.post.findFirst({ where: { id } });
  return response;
}

export async function GET(request: NextRequest) {
  try {
    const id = request.url.split('/blogs/')[1];
    const post = await fetchPost(id);

    return NextResponse.json({ sucess: true, data: post });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    const id = request.url.split('/blogs/')[1];
    const post = await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
      },
    });
    return NextResponse.json({ sucess: true, data: post });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.url.split('/blogs/')[1];
    const deleted = await prisma.post.delete({
      where: { id },
    });
    if (deleted) {
      return NextResponse.json({
        sucess: true,
        message: 'deleted blog succesfully',
      });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
