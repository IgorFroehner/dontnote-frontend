<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type ButtonSize = 'small' | 'medium' | 'large';
	type ButtonVariant = 'primary' | 'secondary';

	type ButtonProps = {
		size?: ButtonSize;
		type?: 'button' | 'submit' | 'reset';
		variant?: ButtonVariant;
		onClick?: (event: MouseEvent) => void;
		loading?: boolean;
		children: HTMLButtonAttributes['children'];
	};

	let { size, type, variant, loading, onClick, children, ...restProps }: ButtonProps = $props();

	const sizeClasses: Record<ButtonSize, string> = {
		small: 'rounded-sm px-2 py-1 text-sm',
		medium: 'rounded-md px-4 py-1 text-base',
		large: 'rounded-lg px-6 py-2 text-lg'
	};

	const variantClasses: Record<ButtonVariant, string> = {
		primary: 'bg-gray-600 text-white dark:bg-white dark:text-gray-600 font-bold',
		secondary: 'bg-white text-gray-600 dark:bg-gray-600 dark:text-white font-bold'
	};

	let buttonSizeClass = sizeClasses[size || 'medium'];
	let buttonVariantClass = variantClasses[variant || 'primary'];
</script>

<button
	{type}
	class={`${buttonSizeClass} ${buttonVariantClass} ${loading ? 'animate-pulse' : ''} hover:opacity-90`}
	onclick={onClick}
	{...restProps}
>
	{@render children?.()}
</button>
