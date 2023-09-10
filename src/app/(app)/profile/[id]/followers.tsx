import { FlatList, TouchableOpacity } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowers } from "@/libs/supabase/api/follows";
import { ErrorState, EmptyState } from "@/components/common";
import {
	Avatar,
	Box,
	HStack,
	Separator,
	Skeleton,
	Title,
} from "@/components/ui";

type User = {
	id: string;
	name: string;
	avatar_url: string;
};

interface UsersPage {
	users: User[];
	nextCursor: number;
}

const FollowersModal = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useInfiniteQuery<UsersPage, Error>({
		queryKey: ["followers", id],
		queryFn: ({ pageParam = 0 }) => getFollowers(id, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (query.isLoading)
		return (
			<HStack alignItems="center" space={8} p={16}>
				<Skeleton width={40} height={40} borderRadius="full" />
				<Skeleton width={120} height={20} borderRadius="md" />
			</HStack>
		);

	if (query.isError) return <ErrorState retry={query.refetch} />;

	return (
		<FlatList
			data={query.data.pages.flatMap((page) => page.users)}
			keyExtractor={(user) => user.id}
			renderItem={({ item: user }) => (
				<Link
					href={{
						pathname: "/(app)/profile/[id]/(tabs)",
						params: { id: user.id },
					}}
					asChild
				>
					<TouchableOpacity>
						<HStack space={8} alignItems="center" p={16}>
							<Avatar
								size={40}
								src={user.avatar_url}
								alt={`${user.name} avatar`}
							/>

							<Title>{user.name}</Title>
						</HStack>
					</TouchableOpacity>
				</Link>
			)}
			ItemSeparatorComponent={() => <Separator />}
			ListEmptyComponent={
				<EmptyState>This user has no followers yet.</EmptyState>
			}
			ListFooterComponent={
				<Box pb={64}>
					{query.hasNextPage && (
						<HStack alignItems="center" space={8} p={16}>
							<Skeleton width={40} height={40} borderRadius="full" />
							<Skeleton width={120} height={20} />
						</HStack>
					)}
				</Box>
			}
			onEndReached={() => query.fetchNextPage()}
			showsVerticalScrollIndicator={false}
		/>
	);
};

export default FollowersModal;
