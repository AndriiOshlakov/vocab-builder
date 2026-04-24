import { NextResponse } from 'next/server';
import { logErrorResponse } from '@/app/api/_utils/utils';
import { api } from '@/app/api/api';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';

type Props = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: Request, { params }: Props) {
  try {
    const { id } = await params;

    const token = (await cookies()).get('token')?.value;
    const res = await api.delete(`/words/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
