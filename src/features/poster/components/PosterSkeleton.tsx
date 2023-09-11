import { AnimatableStringValue } from "react-native";
import { BoxProps, Skeleton, VStack } from "@/components/ui";

type PosterSize = "sm" | "md" | "lg";

interface PosterSkeletonProps extends BoxProps {
	size?: PosterSize;
	textPosition?: "top" | "bottom";
	rotate?: AnimatableStringValue;
}

const PosterSkeleton = ({
	size = "sm",
	textPosition = "bottom",
	rotate,
	...props
}: PosterSkeletonProps) => (
	<VStack
		position="relative"
		alignItems="center"
		space={2}
		style={{ transform: [{ rotate: rotate ? rotate : "0deg" }] }}
		{...boxSizes[size]}
		{...props}
	>
		<Skeleton aspectRatio={5 / 7} borderRadius="sm" {...boxSizes[size]} />

		{textPosition === "bottom" && (
			<Skeleton width="80%" height={13} borderRadius="md" />
		)}
	</VStack>
);

const boxSizes: { [key in PosterSize]: BoxProps } = {
	lg: {
		width: 200,
	},
	md: {
		width: 150,
	},
	sm: {
		width: 100,
	},
};

export default PosterSkeleton;
