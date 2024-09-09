import { prisma } from '@/app/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

async function fetchPosts() {
  const response = await prisma.post.findMany();
  return response;
}

export async function GET() {
  try {
    const posts = await fetchPosts();
    return NextResponse.json({ sucess: true, data: posts });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        description: data.description,
      },
    });
    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
