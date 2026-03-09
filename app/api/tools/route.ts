import { NextRequest, NextResponse } from 'next/server';
import { TOOL_DEFINITIONS, getToolsByCategory, searchTools, getAllCategories } from '@/lib/tools/definitions';
import { APIResponse } from '@/types/tools';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '0', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);

    let tools = TOOL_DEFINITIONS;

    // Filter by category if provided
    if (category) {
      tools = getToolsByCategory(category);
    }

    // Search if query is provided
    if (query) {
      tools = searchTools(query);
    }

    // Pagination
    if (limit > 0) {
      const start = (page - 1) * limit;
      const end = start + limit;
      tools = tools.slice(start, end);
    }

    const response: APIResponse = {
      success: true,
      data: {
        tools,
        total: TOOL_DEFINITIONS.length,
        count: tools.length,
        categories: getAllCategories(),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const response: APIResponse = {
      success: false,
      error: 'Failed to fetch tools',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
