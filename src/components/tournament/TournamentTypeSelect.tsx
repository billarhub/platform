'use client';

import React from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { useGetTournamentTypes } from '@/hooks/api/tournament';
import { ITournamentConfiguration, OptionType } from '@/models';
import { Select } from '../common/Select';

interface TournamentTypeSelectProps {
  token: string;
  error: string | undefined;
  setValue: UseFormSetValue<ITournamentConfiguration>;
}

function TournamentTypeSelect({
  token,
  error,
  setValue,
}: TournamentTypeSelectProps) {
  const { data } = useGetTournamentTypes(token);
  const tournamentTypes: OptionType[] =
    data?.data?.data?.tournamentTypes?.map((type: any) => ({
      label: type.name.toUpperCase(),
      value: type._id,
    })) || [];
  React.useEffect(() => {
    setValue('tournamentTypeId', tournamentTypes[0]?.value.toString());
  }, [tournamentTypes]);

  console.log('tournamentTypes', tournamentTypes);
  return <Select options={tournamentTypes} error={error} />;
}

export default TournamentTypeSelect;
