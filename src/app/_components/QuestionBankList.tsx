'use client';

import { useState } from "react";
import Link from "next/link";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Badge } from "~/components/ui/badge";
import { FileText, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/trpc/react";
import type { QuestionBankStatus } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function QuestionBanksList() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuestionBankStatus | "all">("all");

  const { data: questionBanks, isLoading } = api.questionBank.getAll.useQuery();

  const filteredQuestionBanks = (questionBanks ?? []).filter(bank => {
    let matchesSearch = true;
    let matchesStatus = true;
    
    if (search) {
      matchesSearch = bank.name.toLowerCase().includes(search.toLowerCase());
    }
    
    if (statusFilter !== "all") {
      matchesStatus = bank.status === statusFilter;
    }
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="flex-1">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Question Banks</h2>
          <p className="text-neutral-600">Manage your existing question banks or create new ones</p>
        </div>
        <Button variant="secondary" className="flex items-center" asChild>
          <Link href="/creatordashboard/create">
            <span className="flex items-center">+ New Question Bank</span>
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search question banks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="DECLINED">Declined</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredQuestionBanks.map((bank) => (
          <Card key={bank.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{bank.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant={bank.status === 'PUBLISHED' ? 'default' : 
                            bank.status === 'PENDING' ? 'warning' : 
                            bank.status === 'DECLINED' ? 'destructive' : 'secondary'}
                  >
                    {bank.status.toLowerCase()}
                  </Badge>
                  <span className="text-sm text-neutral-500">
                    {bank.questions.length} questions
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/question-banks/${bank.id}`}>
                    <FileText className="h-4 w-4 mr-1" />
                    View
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}