<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.custName" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

    <!--列表-->
    <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <!--<el-table-column type="selection" width="55">-->
      <!--</el-table-column>-->
      <!--<el-table-column type="index" width="60">-->
      <!--</el-table-column>-->
      <el-table-column prop="custName" label="姓名" width="120" sortable>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="140" sortable>
      </el-table-column>

      <!--格式化参数  :formatter="formatDateTime"-->
      <el-table-column prop="applyTime" label="注册时间" width="180" sortable>
      </el-table-column>
      <el-table-column prop="createDate" label="创建日期" width="130" sortable>
      </el-table-column>

      <!--最小宽度 min-width-->
      <el-table-column prop="createTime" label="创建时间" width="130" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="姓名">
          <el-input v-model="addForm.custName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" >
          <el-input v-model="addForm.phone" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="注册日期">
          <el-date-picker
            v-model="addForm.applyTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="姓名">
          <el-input v-model="editForm.custName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" >
          <el-input v-model="editForm.phone" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="注册日期">
          <el-date-picker
            v-model="editForm.applyTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

	</section>
</template>

<script>

  import H90001 from '../scripts/store/api/api.H90001.js';
  import H90002 from '../scripts/store/api/api.H90002.js';
  import H10001 from '../scripts/store/api/api.H10001.js'
  import H90003 from '../scripts/store/api/api.H90003.js';

  import util from '../utils/util.js';


	export default {
		data() {
			return {
        value1: '',
				filters: {
					custName: '',
          phone: ''
				},
				users: [],
				total: 0,       //总条数
				page: 1,        //当前页数
        pageSize : 10,  //每页显示行数
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
          custName: '',
          phone: '',
          applyTime: '',
          createDate: '',
          createTime: '',
          updateDate: '',
          updateTime: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					custName: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ]
				},
				//新增界面数据
				addForm: {
					custName: '',
					phone: '',
					applyTime: '',
					createDate: '',
          createTime: '',
          updateDate: '',
          updateTime: ''
				}

			}
		},
		methods: {
			//日期格式化
      formatDateTime: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},

      //翻页触发方法
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
          pageSize: this.pageSize,
					custName: this.filters.custName
				};
        this.listLoading = true;
        
        this.$AxiosAjax({
              url: '/H90001',
              params: para
            }).then(res => { // 获取token
              console.log("***************************");
                this.total = res.data.total;
                this.users = res.data.users;
                this.listLoading = false;
            })
			},

      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.addForm);

              para.applyTime = (!para.applyTime || para.applyTime == '') ? '' : util.formatDate.format(new Date(para.applyTime), 'yyyy-MM-dd');

              H90002.H90002(para,data => {
                  console.log("***************************");
                  this.addLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['addForm'].resetFields();
                  this.addFormVisible = false;
                  this.getUsers();

                  console.log("----------------------------")
                },error => {
//                  this.$message({
//                    message: error,
//                    type: 'error'
//                  })
                  this.addLoading = false;
                  this.$alert(
                    error
                  )
                }
              );
            });
          }
        });
      },

			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { custName: row.custName };

          H90003.H90003(para,data => {
              console.log("***************************");
              this.listLoading = false;
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.getUsers();

              console.log("----------------------------")
            }
          );
        });
			},

			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
				console.log(this.editForm);
			},

			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
          custName: '',
          phone: '',
          applyTime: '',
          createDate: '',
          createTime: '',
          updateDate: '',
          updateTime: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);

              para.applyTime = (!para.applyTime || para.applyTime == '') ? '' : util.formatDate.format(new Date(para.applyTime), 'yyyy-MM-dd');

              H90003.H90004(para,data => {
                  console.log("***************************");
                  this.editLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['editForm'].resetFields();
                  this.editFormVisible = false;
                  this.getUsers();

                  console.log("----------------------------")
                }
              );
            });
          }
        })
			},


			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>
