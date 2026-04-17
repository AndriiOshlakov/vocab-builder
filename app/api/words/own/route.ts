import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { logErrorResponse } from '../../_utils/utils';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const limit = Number(request.nextUrl.searchParams.get('limit') ?? 7);
    const category = request.nextUrl.searchParams.get('category') ?? '';
    const keyword = request.nextUrl.searchParams.get('keyword') ?? '';
    const isIrregular = request.nextUrl.searchParams.get('isIrregular') ?? false;
    const token = (await cookies()).get('token')?.value;
    const res = await api.get('/words/own', {
      params: { page, limit, category, keyword, isIrregular },
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
