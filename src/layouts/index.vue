<template>
	<a-layout>
		<a-layout-sider>Sider</a-layout-sider>
		<a-layout>
			<a-layout-header>Header</a-layout-header>
			<a-layout-content>
				<router-view></router-view>
			</a-layout-content>
			<a-layout-footer>Footer</a-layout-footer>
		</a-layout>
	</a-layout>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'

	export default defineComponent({
		setup() {}
	})
</script>
