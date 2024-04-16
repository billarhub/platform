import React from 'react';
import { ITournamentAddPlayer, OptionType } from '@/models';
import { Select } from '../common/Select';
import { useGetAllPlayers } from '@/hooks/api/user';
import { UseFormSetValue } from 'react-hook-form';

interface IPlayerSelectorProps {
  selectedPlayers: any;
  token: string;
  setValue: UseFormSetValue<ITournamentAddPlayer>;
}

function PlayerSelector({ selectedPlayers, setValue }: IPlayerSelectorProps) {
  const { data, isLoading, isError } = useGetAllPlayers();

  const players: OptionType[] =
    data?.data?.data?.users?.map((user: any) => ({
      label: `${user.firstname} ${user.lastname}`,
      value: JSON.stringify(user),
    })) || [];

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('userFromSelect', e.target.value);
  };

  React.useEffect(() => {
    setValue('userFromSelect', players[0]?.value);
  }, [players]);

  return <Select options={players} onChange={onChange} />;
}

export default PlayerSelector;
