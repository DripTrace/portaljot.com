"use server";

import { DJANGO_API_ENDPOINT } from "@/lib/config/defaults"; // Fixing the import path
import { NextResponse } from "next/server";
import ApiProxy from "../../proxy";

const DJANGO_API_WAITLISTS_URL = `${DJANGO_API_ENDPOINT}/waitlists/`;

interface Params {
    id: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
    if (!params?.id) {
        return NextResponse.json({}, { status: 400 });
    }
    const endpoint = `${DJANGO_API_WAITLISTS_URL}${params.id}/`;
    const { data, status } = await ApiProxy.get(endpoint, true);
    return NextResponse.json(data, { status: status });
}

export async function PUT(request: Request, { params }: { params: Params }) {
    if (!params?.id) {
        return NextResponse.json({}, { status: 400 });
    }
    const endpoint = `${DJANGO_API_WAITLISTS_URL}${params.id}/`;
    const requestData = await request.json();
    const { data, status } = await ApiProxy.put(endpoint, requestData, true);
    return NextResponse.json(data, { status: status });
}

export async function DELETE(request: Request, { params }: { params: Params }) {
    if (!params?.id) {
        return NextResponse.json({}, { status: 400 });
    }
    const endpoint = `${DJANGO_API_WAITLISTS_URL}${params.id}/delete/`;
    const { data, status } = await ApiProxy.delete(endpoint, true);
    return NextResponse.json(data, { status: status });
}
