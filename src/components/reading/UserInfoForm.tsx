
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations }sert from "@/hooks/useTranslations"; // Corrected import

interface UserInfoFormProps {
  userName: string;
  setUserName: (name: string) => void;
  readingDate: string;
  setReadingDate: (date: string) => void;
  customDetails: string;
  setCustomDetails: (details: string) => void;
}

export function UserInfoForm({
  userName,
  setUserName,
  readingDate,
  setReadingDate,
  customDetails,
  setCustomDetails,
}: UserInfoFormProps) {
  const { t } = useTranslations();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="userName">{t('yourName')}</Label>
        <Input
          id="userName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="readingDate">{t('readingDate')}</Label>
        <Input
          id="readingDate"
          type="date"
          value={readingDate}
          onChange={(e) => setReadingDate(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="customDetails">{t('customDetails')}</Label>
        <Textarea
          id="customDetails"
          value={customDetails}
          onChange={(e) => setCustomDetails(e.target.value)}
          placeholder={t('customDetailsPlaceholder')}
          className="mt-1 min-h-[80px]"
        />
      </div>
    </div>
  );
}
