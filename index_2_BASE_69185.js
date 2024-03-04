<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="formData.email"
      name="email"
      label="Email"
      placeholder="Enter your email"
      :rules="[
            {
              required: true,
              message: '请输入正确的联系人姓名',
              trigger: 'onBlur'
            },
            { validator: asyncValidator, message: '当前输入的内容存在敏感信息，重新输入' }
          ]"
    />
    <van-button type="primary" native-type="submit">Submit</van-button>
  </van-form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: ''
      }
    };
  },
  methods: {
    // 校验敏感词
    asyncValidator(val) {
      console.log(val)
      return new Promise((resolve) => {
        checkSensitivity
          .post({ sensitivity: val }, false)
          .then((response) => {
            resolve(!response)
          })
          .catch(() => {
            resolve(false)
          })
      })
    },
    onSubmit() {
      // 处理表单提交逻辑
      console.log('Form submitted!');
    }
  }
};
</script>
